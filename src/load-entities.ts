/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
import { join } from 'path';
import { EntitySchema } from 'typeorm';
// import { globSync } from 'glob';
import { glob } from 'glob';

export function loadEntities(): (Function | EntitySchema<any>)[] {
  const entities: (Function | EntitySchema<any>)[] = [];
  const files = glob.sync(join(__dirname, '**/*.entity.{ts,js}'));

  files.forEach((file) => {
    const entityModule = require(file);
    Object.values(entityModule).forEach((entity) => {
      if (typeof entity === 'function' || entity instanceof EntitySchema) {
        entities.push(entity);
      }
    });
  });

  return entities;
}
