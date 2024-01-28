// rafce will give template of react basic code
import { Flex, Box, Button, useDisclosure } from "@/app/chakra";
import { Image } from "@/app/chakra";
import HistoryModal from "./HistoryModal";

const Navbar = () => {
	// all things coming from chakra-UI (modal functionality used)
	const { isOpen, onOpen, onClose } = useDisclosure(); 
	return (
		<>
			<Flex justifyContent={"space-between"} py={6} alignItems={"center"}>

				<Box position={"relative"} width={40} minHeight={10}>
                    <Image src={"/logo.png"} fill alt="github logo" sx={{filter:"invert(1)"}}/>
                </Box>
				<Box>
					<Button size="md" colorScheme="whatsapp" onClick={onOpen}>
						Search History
					</Button>
				</Box>

				{/* In historyModel we fetch data */}
				{isOpen && <HistoryModal isOpen={isOpen} onClose={onClose} />}
			</Flex>
		</>
	);
};

export default Navbar;
