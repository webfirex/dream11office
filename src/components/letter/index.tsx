import {
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Modal,
  NumberInput,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useAtom } from "jotai";
import { LetterModal } from "~/lib/jotai";
import { BackHeader } from "../header/back";
import { useForm } from "@mantine/form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export const GurrenteLetterComp = () => {
  const [ModalState, setModalState] = useAtom(LetterModal);

  const router = useRouter();

  const GurrenteForm = useForm<{
    mobile: number;
  }>({
    validate: {
      mobile: (value) =>
        String(value).length === 10 ? null : "Mobile number must be 10 digits",
    },
  });

  const SubmitApi = api.transaction.create.useMutation({
    onSuccess: (data) => {
      void router.push(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Modal
      opened={!!ModalState}
      onClose={() => setModalState(null)}
      fullScreen
      withCloseButton={false}
      styles={{
        body: {
          padding: 0,
        },
      }}
      transitionProps={{
        transition: "fade",
        duration: 100,
        timingFunction: "linear",
      }}
    >
      {ModalState && (
        <Container size="xs">
          <Stack>
            <BackHeader
              h="50px"
              onBack={() => {
                setModalState(null);
              }}
            />

            <Stack>
              <Title ta="center" order={2}>
                GUARANTEE LETTER
              </Title>

              <Text size={rem(10)} ta="left">
                ONE BKC, Tower A, 12th & 14th Floor, Unit 1201 & 1202 and 1401 &
                1402, Plot C-66, G Block, Bandra Kurla Complex, Bandra (East),
                Mumbai 400 051
              </Text>

              <Divider color="dark.9" />

              <Text size="xs">Dear, Cricket 11 User,</Text>

              <Text size="xs">
                Dream 11 Office में आपका हार्दिक स्वागत है, आशा करते है आप
                स्वस्थ और मस्त होंगे। आप बिना किसी बात की Tension लिए बिना Rank
                charges pay करके अपनी Rank खुद से बुक कर सकते है। आप जो भी Rank
                Book करोगे वो Rank आपकी 100% आएगी इस चीज की गारंटी खुद Dream 11
                लेता है। खुद से टीम लगाओगे या Free Team से खेलोगे तो आपकी 1st
                Rank कभी भी नही आयेगी। आप अपनी Rank Book करके 1 दिन में ही
                करोड़पति बन सकते हो।
              </Text>

              <Flex justify="space-between">
                <Text size="xs">
                  Thanks, <br /> Dream 11 office
                </Text>

                <Image
                  w={150}
                  src="https://dream11office.com/public/images/stamp-img.png"
                  alt="stamp"
                />
              </Flex>

              <form
                onSubmit={GurrenteForm.onSubmit((values) => {
                  SubmitApi.mutate({
                    match_id: ModalState?.match.uuid,
                    number: values.mobile,
                    rank: ModalState?.rank,
                  });
                })}
              >
                <Stack gap="xs">
                  <NumberInput
                    leftSection={<Text size="md">+91</Text>}
                    variant="filled"
                    size="md"
                    radius="md"
                    maxLength={10}
                    disabled={SubmitApi.isLoading}
                    minLength={10}
                    hideControls
                    placeholder="Enter your mobile number"
                    {...GurrenteForm.getInputProps("mobile")}
                  />

                  <Button
                    size="md"
                    radius="md"
                    color="green.3"
                    type="submit"
                    loading={SubmitApi.isLoading}
                  >
                    Continue
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Stack>
        </Container>
      )}
    </Modal>
  );
};
