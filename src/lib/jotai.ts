import { atom } from "jotai";
import { type MatchType } from "./type";

export const LetterModal = atom<{ match: MatchType; rank: number } | null>(
  null
);
