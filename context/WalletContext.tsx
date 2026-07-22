"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface SettlementRecord {
  id: string;
  taskId: string;
  grossNaira: number;
  treasuryShareNaira: number;
  taskerShareNaira: number;
  timestamp: number;
}

export interface CivicScoreEvent {
  id: string;
  delta: number;
  reason: string;
  timestamp: number;
}

const TREASURY_SPLIT = 0.8;
const TASKER_SPLIT = 0.2;

interface WalletContextValue {
  balanceNaira: number;
  civicScore: number;
  settlements: SettlementRecord[];
  civicScoreLog: CivicScoreEvent[];
  settleTaskPayout: (taskId: string, grossNaira: number) => SettlementRecord;
  recordCivicScoreEvent: (delta: number, reason: string) => void;
  withdraw: (amountNaira: number) => boolean;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balanceNaira, setBalanceNaira] = useState<number>(0);
  const [civicScore, setCivicScore] = useState<number>(500);
  const [settlements, setSettlements] = useState<SettlementRecord[]>([]);
  const [civicScoreLog, setCivicScoreLog] = useState<CivicScoreEvent[]>([]);

  const recordCivicScoreEvent = useCallback((delta: number, reason: string) => {
    setCivicScore((prev) => Math.max(0, prev + delta));
    setCivicScoreLog((prev) => [
      { id: makeId("score"), delta, reason, timestamp: Date.now() },
      ...prev,
    ].slice(0, 50));
  }, []);

  const settleTaskPayout = useCallback((taskId: string, grossNaira: number): SettlementRecord => {
    const treasuryShareNaira = Math.round(grossNaira * TREASURY_SPLIT);
    const taskerShareNaira = grossNaira - treasuryShareNaira;

    const record: SettlementRecord = {
      id: makeId("settlement"),
      taskId,
      grossNaira,
      treasuryShareNaira,
      taskerShareNaira,
      timestamp: Date.now(),
    };

    setSettlements((prev) => [record, ...prev].slice(0, 100));
    setBalanceNaira((prev) => prev + taskerShareNaira);
    recordCivicScoreEvent(5, `Verified task ${taskId} completed`);

    return record;
  }, [recordCivicScoreEvent]);

  const withdraw = useCallback((amountNaira: number): boolean => {
    let success = false;
    setBalanceNaira((prev) => {
      if (amountNaira <= 0 || amountNaira > prev) {
        success = false;
        return prev;
      }
      success = true;
      return prev - amountNaira;
    });
    return success;
  }, []);

  const value = useMemo<WalletContextValue>(
    () => ({
      balanceNaira,
      civicScore,
      settlements,
      civicScoreLog,
      settleTaskPayout,
      recordCivicScoreEvent,
      withdraw,
    }),
    [balanceNaira, civicScore, settlements, civicScoreLog, settleTaskPayout, recordCivicScoreEvent, withdraw]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
}

export const SPLIT_RATIOS = { TREASURY_SPLIT, TASKER_SPLIT };
