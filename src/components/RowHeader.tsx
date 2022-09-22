import React from "react";

function RowHeader({ rc, rn }: { rc: string; rn: string }) {
  return (
    <div className="bg-white col-start-1 grid place-content-center text-center h-20 border-b border-solid border-slate-300 last:border-b-0">
      <span>{rc}</span>
      <span>{rn}</span>
    </div>
  );
}

export default RowHeader;
