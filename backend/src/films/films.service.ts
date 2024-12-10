import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateFilmsDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
    constructor(private readonly FilmsRepository: FilmsRepository) { }

    async createFilm(createFilmDto: CreateFilmsDto) {
        return this.FilmsRepository.create(createFilmDto);
    }
    async findAll() {
        return this.FilmsRepository.findAll();
    }
    async findOne(id: string) {
        return this.FilmsRepository.findOne(id);
    }
}
