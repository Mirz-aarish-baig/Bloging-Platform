import { Button } from "./ui/button";
import { useAuth } from "../hooks/use-auth";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "../hooks/use-theme";
import { motion } from "framer-motion";

export function Navbar() {
  const { user, userData, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-b bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <motion.span 
            whileHover={{ scale: 1.1 }}
            className="text-3xl font-extrabold text-white cursor-pointer drop-shadow-md"
          >
            BlogVerse
          </motion.span>
        </Link>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ rotate: 20 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
          </motion.button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Avatar className="h-10 w-10 border border-white shadow-lg">
                    <AvatarImage src={userData?.photo || "/default-avatar.png"} alt={userData?.name || "User"} />
                    <AvatarFallback>
                      {userData?.name ? userData.name.slice(0, 2).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white dark:text-gray-300 mt-1">
                    {userData?.name || "User"}
                  </span>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-lg rounded-lg bg-white dark:bg-gray-800">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 hover:bg-red-100 dark:hover:bg-red-700"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button className="bg-white text-blue-600 shadow-md dark:bg-gray-800 dark:text-white">
                  Login
                </Button>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
