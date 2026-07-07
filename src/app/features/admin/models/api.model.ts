 

// GENERICO y ya no estaria por pages si no q me serviria para todos 
// y no tendria que estar limpiando los states de todos , solo 1 ??

export enum ApiStatus {
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export interface ApiState<T, X> {
  data: T[] | null;
  selectedItem: X | null;
//  status: ApiStatus;
  loading:boolean;
  error:boolean;
}


// const state: ApiState<User[], User> = {
//   status: ApiStatus.Success,
//   data: [
//     { id: 1, name: 'Fernando' },
//     { id: 2, name: 'Ana' }
//   ],
//   selectedItem: {
//     id: 1,
//     name: 'Fernando'
//   }
// };
