import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/films.entity';
import { CreateOrdersDto, TicketsDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}
  async createOrder(orderDto: CreateOrdersDto): Promise<string> {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      await this.processTicket(ticket);
    }

    return `Билет куплен`;
  }

  async processTicket(ticket: TicketsDto): Promise<void> {
    const { film, session, row, seat } = ticket;

    const filmDoc = await this.findFilmById(film);
    const schedule = this.findSessionInFilm(filmDoc, session);

    const seatCode = this.getSeatCode(row, seat);

    if (schedule.taken.includes(seatCode)) {
      throw new BadRequestException(`Место ${seatCode} уже забронировано.`);
    }

    schedule.taken.push(seatCode);
    await this.filmRepository.save(filmDoc);
  }

  async findFilmById(filmId: string): Promise<Film> {
    const filmDoc = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });
    if (!filmDoc) {
      throw new NotFoundException(`Фильм ${filmId} не найден.`);
    }
    return filmDoc;
  }

  private findSessionInFilm(filmDoc: Film, sessionId: string) {
    const sessionIdAsNumber = Number(sessionId);
    const schedule = filmDoc.schedule.find((s) => s.id === sessionIdAsNumber);
    if (!schedule) {
      throw new NotFoundException(
        `Такого сеанса нет ${sessionId} для фильма ${filmDoc.id}.`,
      );
    }
    return schedule;
  }

  private getSeatCode(row: number, seat: number): string {
    return `${row}:${seat}`;
  }
}
