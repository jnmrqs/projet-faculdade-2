import { NextFn, User } from "firebase/auth";

export type UserProps = NextFn<User | null>