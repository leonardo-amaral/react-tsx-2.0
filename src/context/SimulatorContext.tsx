import { createContext, useEffect, useMemo, useState } from "react";
import { SimulatorController } from "../controllers/ios/SimulatorController";

interface SimulatorProviderProps {
  children: React.ReactNode;
}

interface SimulatorContextProps {
  simulatorId: string | null;
  isMaintainance: boolean | null;
}

const SimulatorContext = createContext({} as SimulatorContextProps);

export const SimulatorProvider = ({ children }: SimulatorProviderProps) => {
  const [simulatorId, setSimulatorId] = useState<string | null>(null);
  const [isMaintainance, setIsMaintanance] = useState<boolean>(false);

  const { getSimulatorMode, getSimulatorId } = SimulatorController();

  const fetchSimulatorId = async () => {
    const data = await getSimulatorId();
    setSimulatorId(data.simulators[0]);
  };

  const fetchSimulatorMode = async () => {
    const data = await getSimulatorMode({
      simulator_id: simulatorId,
    });
    setIsMaintanance(data.is_active);
  };

  useEffect(() => {
    fetchSimulatorId();

    // Fetch simulator mode (is in maintenance mode)
    const intervalId = setInterval(() => {
      fetchSimulatorMode();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const value = useMemo(
    () => ({
      simulatorId,
      isMaintainance,
    }),
    [simulatorId]
  );

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
};
