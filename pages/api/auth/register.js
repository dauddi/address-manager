import prisma from "../../../utils/db";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return res.status(405).json({ message: "Invalid Request" });

	const data = JSON.parse(req.body);
	const response = await prisma.user.create({
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		},
	});
	if (!response) return res.status(401).json({ message: "Request failed" });
	return res.status(200).json({ user: response });
};

export default handler;
