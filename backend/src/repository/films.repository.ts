
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/films.entity';
import { CreateFilmsDto, GetFilmsDto, GetScheduleDto } from '../films/dto/films.dto';
import { Schedule } from '../films/entities/shedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) { }

  async findAll(): Promise<{ items: Film[]; total: number }> {
    const [items, total] = await Promise.all([
      this.filmRepository.find({ relations: ['schedule'] }),
      this.filmRepository.count(),
    ]);

    return { items, total };
  }
  async findOne(
    id: string,
  ): Promise<{ items: Schedule[] | null; total: number }> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    const total = film ? film.schedule.length : 0;

    return { items: film ? film.schedule : null, total };
  }


  async create(createFilmDto: CreateFilmsDto): Promise<Film> {
    const newFilm = this.filmRepository.create({
      ...createFilmDto,
      schedule: createFilmDto.schedule.map(scheduleDto => {
        const schedule = new Schedule();

        schedule.daytime = scheduleDto.daytime;
        schedule.hall = scheduleDto.hall;
        schedule.rows = scheduleDto.rows;
        schedule.seats = scheduleDto.seats;
        schedule.price = scheduleDto.price;
        schedule.taken = scheduleDto.taken;
        return schedule;
      }),
    });
    const savedFilm = await this.filmRepository.save(newFilm);
    return savedFilm;
  }

}

