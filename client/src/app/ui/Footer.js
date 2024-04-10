import Image from "next/image"

export default function Footer() {
  return (
    <footer className="text-center p-4 bg-gray-200">
      <div className="flex justify-center mb-4">
        <a href="https://www.youtube.com/" className="px-4">
          <Image
            alt="csm61b youtube"
            src="/youtube.svg"
            width={30}
            height={30}
          />
        </a>
        <a href="https://www.overleaf.com/" className="px-4">
          <Image
            alt="csm61b overleaf"
            src="/overleaf.png"
            width={26}
            height={26}
          />
        </a>
        <a href="https://drive.google.com/" className="px-4">
          <Image
            alt="csm61b content folder"
            src="/folder.svg"
            width={30}
            height={30}
          />
        </a>
      </div>
      <p className="text-sm font-bold">Made by Jc Sun</p>
      <p className="text-xs">Work in Progress</p>
    </footer>
  )
}
