import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, getRepository } from 'typeorm'
import { User } from '../../entity/User';
import config from '../../config/config';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.save(userRepository.create(
      { username: 'admin@tester.com.ar', role: config.Roles.admin, password:'admin'}
    ));
    await userRepository.save(userRepository.create(
      { username: 'editor@tester.com.ar', role: config.Roles.editor, password:'editor'}
    ));
}
}