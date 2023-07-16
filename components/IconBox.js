import { Flex, Link } from '@chakra-ui/react';
import React from 'react'
import {motion} from 'framer-motion'

const IconBox = ({ alone, link, children, to, delay }) => {
	return (
		<Link
			href={`https://${to}/${link}`}
			target="_blank"
			_focus={{ border: 0 }}
		>
			<motion.div
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
					delay,
					duration: 0.7,
				}}
			>
				<Flex
					w="max-content"
					h="max-content"
					fontSize="1.6rem"
					border={alone ? "" : "1.5px solid"}
					borderColor="myblack"
					borderRadius="8px"
					p={alone ? "" : "0.4rem"}
					cursor="pointer"
					opacity="0.65"
					_hover={{
						opacity: "1",
					}}
					_focus={{
						opacity: "1",
					}}
					transition="opacity 250ms ease"
				>
					{children}
				</Flex>
			</motion.div>
		</Link>
	);
};

export default IconBox