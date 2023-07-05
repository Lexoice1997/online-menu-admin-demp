import { $authHost } from '../../../helpers/api/api';
import { IAddPosition } from '../employeePositionTypes/employeePositionTypes';

export function getPositions() {
  return $authHost.get(`/position`);
}

export function addPosition(data: IAddPosition) {
  return $authHost.post('/position', data);
}
