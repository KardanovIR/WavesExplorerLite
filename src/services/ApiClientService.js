import {nodeApi} from '../shared/NodeApi';
import {ConfigurableService} from './ConfigurableService';

export class ApiClientService extends ConfigurableService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    getApi = () => nodeApi(this.configuration().apiBaseUrl);
}
