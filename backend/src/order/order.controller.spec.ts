import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrdersDto, TicketsDto } from './dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrdersDto = {
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [
          {
            film: 'Film Title',
            session: 'Session ID',
            daytime: '2023-10-01',
            day: 'Sunday',
            time: '18:00',
            row: 1,
            seat: 5,
            price: 10.0,
          },
        ],
      };
      const result = { id: '1', ...createOrderDto };
      mockOrderService.createOrder.mockReturnValue(result);

      expect(await orderController.createOrder(createOrderDto)).toBe(result);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
    });
  });
});
