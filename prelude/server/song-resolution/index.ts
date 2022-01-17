import Repository from './repository';
import Service from './service';
import Controller from './controller';

export default () => Controller(Service(Repository()));
