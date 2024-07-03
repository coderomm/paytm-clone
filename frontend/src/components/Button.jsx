

export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" className="w-full text-[#163300] font-bold bg-[#9fe870] border border-[#9fe870] transition-colors duration-150 ease-in-out text-base rounded-full select-none py-2 px-4">{label}</button>
}
  