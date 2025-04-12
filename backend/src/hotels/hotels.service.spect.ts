import { HotelsService } from './hotels.service';
import { NotFoundException } from '@nestjs/common';

describe('HotelsService', () => {
  let service: HotelsService;

  beforeEach(() => {
    service = new HotelsService();
  });

  it('debería crear un hotel', () => {
    const hotel = service.create({
      name: 'Hotel Test',
      location: 'Ciudad Test',
      description: 'Descripción de prueba',
    });
    expect(hotel.id).toBeDefined();
    expect(hotel.name).toEqual('Hotel Test');
  });

  it('debería obtener todos los hoteles', () => {
    service.create({ name: 'Hotel Test', location: 'Ciudad Test', description: 'Descripción' });
    const hotels = service.findAll();
    expect(hotels.length).toBeGreaterThan(0);
  });

  it('debería lanzar un error al buscar un hotel no existente', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('debería eliminar un hotel', () => {
    const hotel = service.create({ name: 'Hotel Test', location: 'Ciudad Test' });
    service.remove(hotel.id);
    expect(() => service.findOne(hotel.id)).toThrow(NotFoundException);
  });
});
