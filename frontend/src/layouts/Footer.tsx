import logo from '@/assets/images/logo.png';
import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#0B666A] text-white p-20">
      <div className="flex justify-between">
        <div>
          <Link to="/">
            <img className="h-20" src={logo} alt="Logo" />
          </Link>
          <div className="flex mt-5 gap-2 text-2xl">
            <RiFacebookBoxFill />
            <RiInstagramLine />
          </div>
        </div>
        <div className="flex gap-20 ">
          <ul className="space-y-2 ">
            <li>Upcoming</li>
            <li>Updates</li>
            <li>How it works</li>
          </ul>
          <ul className="space-y-2">
            <li>Support</li>
            <li>Careers</li>
          </ul>
          <ul className="space-y-2">
            <li>List your books</li>
            <li>Contact team</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p> &#169; Read wise {year}</p>
        <p className="ml-right">Privacy Policy</p>
        <p className="ml-right">Terms & Condition</p>
      </div>
    </div>
  );
}
