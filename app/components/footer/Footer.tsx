"use client";
import { usePathname } from "next/navigation";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import MaxWidth from "../max-width/MaxWidth";
import Link from "next/link";
import { useGetAllContactInformationQuery } from "@/app/redux/settingApi";

const Footer = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const { data } = useGetAllContactInformationQuery("");

    console.log(data?.data?.youtube_url);

    const socials = [
        { Icon: FaTiktok, link: data?.data?.tiktok_url },
        { Icon: FaInstagram, link: data?.data?.instagram_url },
        { Icon: FaTwitter, link: data?.data?.twitter_url },
        { Icon: FaYoutube, link: data?.data?.youtube_url },
    ];

    return (
        <footer className="bg-white border-t">

            <MaxWidth>
                <div className="py-12">

                    {/* NEWSLETTER */}
           

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        {/* BRAND */}
                        <div>
                            <h2 className="text-2xl font-bold text-green-700">
                                FoodExpress 🍔
                            </h2>
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                Fast, fresh & delicious food delivered to your doorstep within minutes.
                            </p>
                        </div>

                        {/* LINKS */}
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>

                            <ul className="space-y-3 text-sm">

                                {[
                                    { name: "Home", path: "/" },
                                    { name: "Foods", path: "/foods" },
                                    { name: "Blogs", path: "/blogs" },
                                ].map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`relative transition font-medium ${isActive(item.path)
                                                ? "text-green-700"
                                                : "text-gray-500 hover:text-green-700"
                                                }`}
                                        >
                                            {item.name}

                                            {/* 🔥 Active Indicator */}
                                            {isActive(item.path) && (
                                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600 rounded-full" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SUPPORT */}
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>

                            <ul className="space-y-3 text-sm">

                                {[
                                    { name: "Help Center", path: "/help" },
                                    { name: "Contact", path: "/contact" },
                                    { name: "Privacy", path: "/privacy" },
                                    { name: "Terms", path: "/terms" },
                                ].map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`relative transition font-medium ${isActive(item.path)
                                                ? "text-green-700"
                                                : "text-gray-500 hover:text-green-700"
                                                }`}
                                        >
                                            {item.name}

                                            {isActive(item.path) && (
                                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600 rounded-full" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SOCIAL */}
                        <div>
                            <h3 className="font-semibold mb-4">Follow Us</h3>

                            <div className="flex gap-3">
                                {socials.map(({ Icon, link }, i) => (
                                    <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 border rounded-full cursor-pointer transition hover:bg-green-100 hover:scale-110"
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Stay connected for daily food deals 🍔
                            </p>
                        </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="border-t mt-10 pt-5 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} LOVELY&lsquo;S. Made with ❤️ for food lovers.
                    </div>

                </div>
            </MaxWidth>

        </footer>
    );
};

export default Footer;