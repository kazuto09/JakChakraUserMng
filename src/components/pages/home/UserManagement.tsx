/*eslint-disable react-hooks/exhaustive-deps */
import {
  Stack,
  Wrap,
  WrapItem,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  FormLabel
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";

import { UserCard } from "../../organisms/user/UserCard";
import { useAllUsers } from "../../../hooks/useAllUsers";
import { UserDetailModal } from "../../organisms/user/UserDetailModal";
import { useSelectedUser } from "../../../hooks/useSelectedUser";
import { useLoginUser } from "../../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectedUser();
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id: id, users: users, onOpen });
    },
    [users, onSelectUser, selectedUser]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="space-around">
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay>
          <ModalContent pb={6}>
            <ModalHeader>ユーザー詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>名前</FormLabel>
                  <Input value="じゃけえ" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>フルネーム</FormLabel>
                  <Input value="フルネーム" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>MAIL</FormLabel>
                  <Input value="じゃけえ" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>TEL</FormLabel>
                  <Input value="じゃけえ" isReadOnly />
                </FormControl>
              </Stack>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <UserDetailModal
        user={selectedUser}
        isAdmin={loginUser?.isAdmin}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
