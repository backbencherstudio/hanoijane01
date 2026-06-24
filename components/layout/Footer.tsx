"use client";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    platform: [
      { name: "Exhibition Map", href: "/exhibition-map" },
      { name: "Browse Stands", href: "/" },
      { name: "Pricing", href: "/" },
      { name: "Exhibitor Login", href: "/" },
      { name: "Admin Portal", href: "/" },
    ],
    resources: [
      { name: "FAQ", href: "/" },
      { name: "Terms & Conditions", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Cookie Policy", href: "/" },
    ],
    event: [
      { name: "About Expo 2027", href: "/" },
      { name: "Venue & Location", href: "/" },
      { name: "Visitor Information", href: "/" },
      { name: "Media & Press", href: "/" },
      { name: "Sponsorship", href: "/" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: FaXTwitter,
      href: "",
      color: "",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "",
      color: "",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      href: "",
      color: "",
    },
    {
      name: "Facebook",
      icon: TbBrandFacebook,
      href: "",
      color: "",
    },
  ];

  return (
    <footer className="relative bg-[#0B2B41] text-white">
      {/* Animated Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-br from-primary via-secondary to-primary animate-gradient-x" />

      <div className="relative container px-4 sm:px-6 lg:px-8 pb-12 pt-20 md:pt-28 lg:pt-36 xl:pt-40">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 w-2/3">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <Image src="/logo.webp" alt="Logo" width={90} height={74} />
              </div>
            </Link>
            <p className="text-[#D2D2D5] mt-2 font-normal leading-relaxed">
              The professional exhibition stand booking platform for Industry
              Expo 2027. Book, manage, and exhibit, all in one place.
            </p>
            {/* Contact Info */}
            <div className="text-[#D2D2D5] mt-6 space-y-4">
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />{" "}
                exhibitors@industryexpo2027.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                +971 4 XXX XXXX
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />{" "}
                exhibitors@industryexpo2027.com
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              Platform
            </h3>
            <ul className="space-y-2">
              {navigation.platform.map((item) => (
                <li
                  key={item.name}
                  className="hover:translate-x-1 transition-all font-normal text-[#A5A5AB]"
                >
                  <Link href={item.href}>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Resources Links */}
          <div>
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              Resources
            </h3>
            <ul className="space-y-2">
              {navigation.resources.map((item, idx) => (
                <li
                  key={item.name}
                  className="hover:translate-x-1 transition-all font-normal text-[#A5A5AB]"
                >
                  <Link href={item.href}>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Event */}
          <div className="w-fit lg:justify-self-end">
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              Event
            </h3>
            <ul className="space-y-2">
              {navigation.event.map((item) => (
                <li
                  key={item.name}
                  className="hover:translate-x-1 transition-all font-normal text-[#A5A5AB]"
                >
                  <Link href={item.href}>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[#A5A5AB]">
              © {currentYear} ExhibitPro. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {/* Social Links */}
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg bg-white/5 hover:bg-primary border border-white/10 text-[#A4BCF8] hover:text-white  flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color} `}
                      aria-label={social.name}
                    >
                      <social.icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
