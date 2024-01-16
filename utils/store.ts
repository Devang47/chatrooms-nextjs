import { create } from "zustand";

type LoadingStore = {
  loading: boolean;
  loadingUpload: boolean;
  toggleLoading: (value?: boolean) => void;
  toggleLoadingUpload: (value?: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  loadingUpload: false,
  toggleLoading: (value?: boolean) =>
    set((state: LoadingStore) => ({
      ...state,
      loading: value ?? !state.loading,
    })),
  toggleLoadingUpload: (value?: boolean) =>
    set((state: LoadingStore) => ({
      ...state,
      loadingUpload: value ?? !state.loadingUpload,
    })),
}));

type RoomStore = {
  user: any;
  roomId: string;
  roomMessages: Message[];
  roomData: any;
  setRoomId: (id: string) => void;
  setRoomMessages: (messages: any[]) => void;
  setRoomData: (data: any) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  user: {},
  roomId: "",
  roomMessages: [],
  roomData: {},
  setRoomId: (id: string) =>
    set((state: RoomStore) => ({ ...state, roomId: id })),
  setRoomMessages: (messages: any[]) =>
    set((state: RoomStore) => ({ ...state, roomMessages: messages })),
  setRoomData: (data: any) =>
    set((state: RoomStore) => ({ ...state, roomData: data })),
  setUser: (user: any) => set((state: RoomStore) => ({ ...state, user: user })),
}));
