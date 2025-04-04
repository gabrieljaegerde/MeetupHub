import { useChainId, useLazyLoadQuery } from "@reactive-dot/react";

export function ChainPage() {
  const chainId = useChainId();
  console.log(chainId);

  const [timestamp, blockNumber] = useLazyLoadQuery((builder) =>
    builder.storage("Timestamp", "Now").storage("System", "Number"),
  );
  console.log(timestamp, blockNumber);


  return (
    <>
      <h1>Your app is ready</h1>
      <p className="m-2">
        Connected to chain <strong>{chainId}</strong>
      </p>
      <p className="m-2">
        Current block is <strong>{blockNumber.toString()}</strong>
      </p>
      <p className="m-2">
        Timestamp: <strong>{timestamp.toString()}</strong>
      </p>
    </>
  );
}
