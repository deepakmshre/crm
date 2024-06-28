"use client";
import React from "react";
 
import Link from "next/link";
import { useState } from "react";
import TokenDecoder from "./Cookies";
import {   usePathname } from "next/navigation";
 
import axios from "axios";
import { GoHome } from "react-icons/go";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { MdPeople } from "react-icons/md";
import { FaHandshake } from "react-icons/fa6";
 
import { IoGitNetworkSharp } from "react-icons/io5";
 
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
const Sidebar = ({ sidePanelStat, setSidePanelStat }) => {
 
  
  const handleLogout = () => {
    axios
      .post("/api/users/logout")
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Failed to logout inactive user:", error);
      });
  };

  const userdata = TokenDecoder();
const userid = userdata ? userdata.id : null;
const userrole = userdata ? userdata.role : null;
const hidden = ['Admin', 'superAdmin', 'Operations']
  const sideMenus = [
    {
      id: 0,
      name: "profile",
      link: "/profile",
      icon: <GoHome />,
      
    },
    {
      id: 1,
      name: "staff",
      link: "/Staff",
      icon: <MdPeople />,
      notifications: 5
    },
    {
      id: 2,
      name: "leads",
      link: "",
      icon: <IoGitNetworkSharp />,
      nested: [{name:'Community Leads', link:'/Community-Leads'}]
    },
    
    {
      id: 3,
      name: "reports",
      link: "",
      icon: <HiOutlineClipboardDocumentCheck />,
      nested: [{name:'Timesheet', link:'/Timesheet'}, {name:'Detailed progress report', link:'/Detailed-Progress-Report'}]
    },
    {
      id: 4,
      name: "your deals",
      link: "",
      icon: <FaHandshake />,
      nested: [{name:"Deals Approvals", link:'/Your-Deals'}, {name:"KYC and Sanction", link:'/KYC-and-Sanctions'}, {name:"MIS", link:'/mis'}],
      
    },
    
    {
      id: 5,
      name: "Log out",
      icon: <RiLogoutCircleLine />
    },
  ];
 
 console.log(userrole)
const roleHandler = () => {
  if (!hidden.includes(userrole)) {
    sideMenus.splice(3, 2);  
  }
};
 roleHandler();
  const pathname = usePathname();
 
  const path = usePathname();

  const [currIndex, setCurrentIndex] = useState(null)
  const sidehandler = (index) => {
    if (currIndex == index) { 
      setCurrentIndex(null)
    }
    else {
      setCurrentIndex(index)
    }
    if (sideMenus[index].nested) { 
      setSidePanelStat(true)
    }
    if (index == 5) { 
      handleLogout();
    }
    
  }
  return (
    <>
      <div
        className={`fixed  top-20 h-[calc(100vh-5rem)] shadow-md bg-white transition-all ease-[cubic-bezier(0.435, 0.000, 0.070, 1.035)] duration-300 z-[9999] ${
          sidePanelStat ? "w-[300px] shadow-lg" : "w-[100px]"
        }`}
      >
        <div
          className={`flex flex-col justify-start  items-center relative h-full`}
        >
          <div
            className={`flex flex-col w-full  gap-1 ${
              sidePanelStat ? "" : "items-center"
            }`}
          >
            <div
              className={` flex w-full px-4 justify-start transition-all duration-200  ${
                sidePanelStat ? "" : ""
              }`}
            >
             
            </div>

            <div
              className={`flex flex-col items-center  gap-2 px-4 w-full  ${
                sidePanelStat ? " " : ""
              }`}
            >
              {sideMenus.map((elem, index) => {
                return (
                  <Link
                    href={ elem.link ? elem.link :''}
                    className={`flex relative flex-col !mb-0 text-black justify-start gap-2 w-full ${elem.name == 'Log out' ? 'hover:!bg-red-400' : 'hover:bg-slate-100 '} rounded-md transition-all duration-200 cursor-pointer items-center  py-1 group justify-between  ${pathname == elem.link
                      ? "bg-slate-100"
                      : ""
                      } `}
                    onClick={()=>sidehandler(index)}
                    key={index}
                  >
                    {
                      !sidePanelStat && <div className="absolute left-[100%] group-hover:block hidden z-[999] rounded-md top-3 px-2 bg-black text-white capitalize text-nowrap">{ elem.name}
                      </div> 
                    }
                    <div className="flex items-center px-2 justify-between gap-2 w-full">

                      <div
                        className={`transition-all  p-2 flex justify-start items-center gap-3   duration-200  cursor-pointer rounded-lg`}
                      >
                        
                        <p className="!mb-0 !mt-0 text-xl">{elem.icon}</p>
                        <p className={`!mb-0 !mt-0  font-Satoshi font-[500] !text-md text-nowrap capitalize ${sidePanelStat ? 'block ' : 'hidden'}`}>
                          {elem.name}
                        </p>
                      </div>

                       
                      {sidePanelStat && elem.notifications && (
                        <div className="bg-[#8EE4FF] flex justify-center size-5 rounded-full items-center">
                          { elem.notifications }
                        </div>
                      )}


                      { 
                        elem.nested && <FaChevronDown   />
                      }

                    </div>
                   
                    {
                      sidePanelStat && currIndex ? index == currIndex && sideMenus[currIndex].nested && elem.nested.map((nest, id) => { return (<Link key={id} className={ `w-full text-md py-2 hover:bg-slate-200 px-2 text-black ${pathname == nest.link
                        ? "bg-slate-100"
                        : ""
                        }  `} href={ nest.link? nest.link : ''} onClick={(e) => { e.stopPropagation()}}><p className="!mb-0 !mt-0  ml-12 font-medium">{ nest.name}</p></Link>)}) : null
                      }
                     
                  </Link>
                );
              })}
            </div>
          </div>

          
         
        </div>
      </div>
    </>
  );
};

export default Sidebar;
