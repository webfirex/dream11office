import { atom } from "jotai";
import { type MatchType } from "./data";

export const LetterModal = atom<{ match: MatchType; rank: number } | null>(
  null
);
