import prisma from "../../utils/db";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const { name, address, phoneNumber, creatorId } = JSON.parse(req.body);
		const response = await prisma.contact.create({
			data: {
				name: name,
				phoneNumber: phoneNumber,
				address: address,
				creatorId: creatorId,
			},
		});
		if (!response)
			return res.status(401).json({ message: "Something went wrong" });
		return res.status(200).json({ message: response });
	} else if (req.method === "DELETE") {
		const { id } = JSON.parse(req.body);
		const response = await prisma.contact.delete({
			where: {
				id: id,
			},
		});
		if (!response)
			return res.status(401).json({ message: "Something went wrong" });
		return res.status(200).json({ message: response });
	} else {
		return res.status(405).json({ message: "Invalid Request" });
	}
};

export default handler;
