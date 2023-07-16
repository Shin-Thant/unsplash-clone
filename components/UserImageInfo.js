import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const UserImageInfo = ({ count, name }) => {
	return (
		<Flex flexDir="column" align="center">
			<motion.h1
				initial={{
					y: 15,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					type: "tween",
					delay: 1.7,
					duration: 0.7,
				}}
			>
				<Text
					fontSize={{
						base: "1.3rem",
						md: "1.4rem",
					}}
					fontWeight="600"
				>
					{count || "-"}
				</Text>
			</motion.h1>

			<motion.h1
				initial={{
					y: 15,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					type: "tween",
					delay: 1.8,
					duration: 0.6,
				}}
			>
				<Text fontSize="0.9rem" fontWeight="500" opacity="0.9">
					{name}
				</Text>
			</motion.h1>
		</Flex>
	);
};

export default UserImageInfo;
