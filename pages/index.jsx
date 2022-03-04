import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from 'next/link';
import { ContactsTable, NoContactsFound } from "../components";
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { checkCookies, removeCookies, getCookie } from "cookies-next";
import { PrismaClient } from "@prisma/client";

const Home = ({ isAuthenticated, userData, contacts }) => {
	const [user, setUser] = useState({});
	const [contactList, setContactList] = useState([]);
	const [searchKeyword, setSearchKeyword] = useState("");

	if (!isAuthenticated) {
		Router.push('/auth/login');
	}

	useEffect(() => {
		setUser(userData);
		setContactList(contacts)
	}, [userData, contacts]);

	const handleSearch = useCallback (() => {
		const searchResults = contacts.filter(contact => contact.name.toLowerCase().includes(searchKeyword?.trim().toLowerCase())	)
		setContactList(searchResults);
	}, [searchKeyword, contacts])

	useEffect(() => {
		handleSearch()
	}, [searchKeyword, handleSearch])

	const handleLogout = () => {
		removeCookies("user");
		Router.push('/auth/login')
	}

	const handleContactDelete = async (contact) => {
		const response = await fetch('/api/contacts', {
			method: "DELETE",
			body: JSON.stringify(contact),
		})
		if (response.status === 200) {
			console.log("deletion successful");
		} else {
			console.log("deletion failed");
		}
	}

	return (
		<div className="min-w-[100%] ">
			<Head>
				<title>Address Book Manager</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="w-[95%] md:w-[75%] xl:w-[50%] mx-auto mt-8 ">
				<div className="w-full flex flex-col items-center justify-center " >
					<h1 className="text-indigo-500 font-bold text-xl " >Welcome, 
						<span className="font-extrabold text-indigo-600  " > { user.firstName } </span>
					</h1>
					<div className="my-8 flex bg-indigo-500 rounded-md border-2 border-indigo-300 focus:border-indigo-600 " >
						<input onChange={(event) => setSearchKeyword(event.target.value)} value={searchKeyword} className="p-2 font-semibold focus:outline-none" type="text" placeholder="Find Contact" />
						<div onClick={handleSearch} className="flex items-center justify-center px-4 rounded-md hover:cursor-pointer hover:bg-indigo-600 " >
							<FiSearch className="text-2xl text-white" />
						</div>
					</div>
					<div>
					</div>
					<div className="w-full mt-8 flex justify-center items-center " >
						{ contactList.length && <ContactsTable contacts={contactList} contactList={contactList} setContactList={setContactList} handleContactDelete={handleContactDelete} /> }
						{ !contactList.length && <NoContactsFound /> }
					</div>
					<div className="absolute flex flex-col justify-center items-start gap-5 bottom-5 left-5 " >
						<Link href="/contacts/new" passHref >
							<div className="flex justify-center items-center gap-3 font-bold text-green-900 hover:cursor-pointer " >
								<AiOutlineUserAdd />
								<h3>Add Contact</h3>
							</div>
						</Link>
						<div onClick={handleLogout} className="flex justify-center items-center gap-3 text-red-500 font-bold hover:cursor-pointer hover:text-red-600 " >
							<FiLogOut />
							<h3>Logout</h3>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export const getServerSideProps = async ({req, res}) => {
	const prisma = new PrismaClient();
	const isUserCookiePresent = checkCookies('user', { req, res });
	let userData = null;

	setTimeout(() => {
		if (!isUserCookiePresent) {
			res.setHeader("location", "/auth/login");
			res.statusCode = 307;
			return res.end();
		}
	}, 100);

	if (isUserCookiePresent) {
		userData = JSON.parse(getCookie("user", { req, res }));
	}

	const contacts = await prisma.contact.findMany({
		where: {
			creatorId: userData?.id,
		},
	});

	return {
		props: {
			isAuthenticated: isUserCookiePresent,
			userData: userData,
			contacts: contacts,
		},
	}
}

export default Home;
