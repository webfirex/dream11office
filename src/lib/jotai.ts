import { atom } from "jotai";
import { type MatchType } from "./data";

export const LetterModal = atom<MatchType | null>(null);
