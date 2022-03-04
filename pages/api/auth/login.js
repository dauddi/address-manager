import prisma from "../../../utils/db";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return res.status(405).json({ message: "Invalid Request" });

	const { email, password } = JSON.parse(req.body);

	const response = await prisma.user.findFirst({
		where: {
			email: email,
			password: password,
		},
	});

	if (!response)
		return res.status(401).json({ message: "Invalid email or password" });
	return res.status(200).json({ user: response });
};

export default handler;
