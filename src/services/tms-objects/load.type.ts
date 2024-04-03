export interface ILoadStatusObject {
  load_status_id: number;
  load_status_name: string;
  is_active: boolean;
}

export const loadStatusInitialState:ILoadStatusObject = {
  load_status_id: 0,
  load_status_name: "",
  is_active: false,
};

export interface IDispatcherLoadObject {
  load_dispatcher_id: number;
  load_dispatcher_name: string;
  is_active: boolean;
}

export const loadInitialDispatcher = {
  load_dispatcher_id: 0,
  load_dispatcher_name: "",
  is_active: false,
};

export interface IStateObject {
  state_id: number;
  country_id: number;
  state_name: string;
  state_short_name?: null;
  state_code?: null;
}

export const loadInitialState = {
  state_id: 0,
  country_id: 0,
  state_name: "",
  state_short_name: "",
  state_code: "",
};
