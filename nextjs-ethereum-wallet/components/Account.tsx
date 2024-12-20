import { useEffect } from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  return (
    <div>
      {ensAvatar && (
        <img className="w-14 h-14" alt="ENS Avatar" src={ensAvatar} />
      )}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
