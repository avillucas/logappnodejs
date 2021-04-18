import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, getRepository } from 'typeorm'
import { User } from '../../entity/User';
import config from '../../config/config';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.save(userRepository.create(
      { username: 'admin@tester.com.ar', role: config.Roles.admin, password:'1111',sexo:'F'}
    ));
    await userRepository.save(userRepository.create(
      { username: 'invitado@invitado.com', role: config.Roles.invitado, password:'2222',sexo:'F'}
    ));
    await userRepository.save(userRepository.create(
      { username: 'usuario@usuario.com', role: config.Roles.usuario, password:'3333',sexo:'M'}
    ));
    await userRepository.save(userRepository.create(
      { username: 'anonimo@anonimo.com', role: config.Roles.usuario, password:'4444',sexo:'M'}
    ));
    await userRepository.save(userRepository.create(
      { username: 'tester@tester.com', role: config.Roles.tester, password:'5555',sexo:'F'}
    ));    
  }
}