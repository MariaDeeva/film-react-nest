import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { CreateFilmsDto } from './dto/films.dto';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    createFilm: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const result = [{ id: '1', title: 'Film 1' }];
      mockFilmsService.findAll.mockReturnValue(result);

      expect(await filmsController.findAll()).toBe(result);
      expect(mockFilmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findSchedule', () => {
    it('should return a film schedule', async () => {
      const id = '1';
      const result = { id, daytime: '2023-01-01', hall: 1 };
      mockFilmsService.findOne.mockReturnValue(result);

      expect(await filmsController.findSchedule(id)).toBe(result);
      expect(mockFilmsService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create a new film', async () => {
      const createFilmDto: CreateFilmsDto = {
        rating: 5,
        director: 'Director',
        tags: ['tag1', 'tag2'],
        image: 'image.png',
        cover: 'cover.png',
        title: 'New Film',
        about: 'About the film',
        description: 'Description of the film',
        schedule: [],
      };
      const result = { id: '1', ...createFilmDto };
      mockFilmsService.createFilm.mockReturnValue(result);

      expect(await filmsController.create(createFilmDto)).toBe(result);
      expect(mockFilmsService.createFilm).toHaveBeenCalledWith(createFilmDto);
    });
  });
});
