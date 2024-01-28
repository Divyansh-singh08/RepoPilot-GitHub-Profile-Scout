"use client";
import { Button ,Container, Text} from "@/app/chakra";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";

// container will make everything as  in center

export default function Home() {
	// here we Lifting_up the state
	const [userData, setUserData] = useState(null);
	// For happing loading for a second this state used
	const [loading, setLoading] = useState(false);
	// console.log(userData);
	return (
		<Container maxW="container.lg">
			<Navbar/>
			{/* this text is showing the title  */}
			<Text fontSize={"2xl"} textAlign={"center"} my={4}>
				Search  users on Github
			</Text>
			{/* this is the Search box for searching the data */}
			<Search setUserData={(res) => setUserData(res)} setLoading={setLoading}/>
			{/* here UserProfile we pass user data it will display in userProfile container */}
			{userData && <UserProfile userData={userData}/>}
		</Container>
	);
}
