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
import React, { useState } from "react";

export const GurrenteLetterComp = () => {
  const [ModalState, setModalState] = useAtom(LetterModal);

  const [VideoVisible, setVideoVisible] = useState(false);
  const [UrlToRedirect, setUrlToRedirect] = useState<string | null>(null);

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
    onSuccess: (data: string) => {
      // setVideoVisible(true);
      // setUrlToRedirect(data);
      void router.push('https://cosmofeed.com/vig/6618e2d8fa41b00012e96bf2');
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
          height: "100%",
          overflowY: "scroll"
        },
      }}
      transitionProps={{
        transition: "fade",
        duration: 100,
        timingFunction: "linear",
      }}
    >
      {ModalState && (
        <Container size="xs" p={0} h="100%">
          {VideoVisible ? null : (
            <>
              <Stack h="100%" gap={0}>
                <BackHeader
                  h="50px"
                  onBack={() => {
                    setModalState(null);
                  }}
                />

                <Image src="/letter-head.png" alt="Letter Head" />

                <Flex
                  direction="column"
                  p="md"
                  justify="space-between"
                  h="100%"
                  mt={-70}
                >
                  <Stack>
                    <Flex justify="space-between" align="center">
                      <Image
                        src="/lt-logo.png"
                        h={90}
                        w={90}
                        alt="Letter Head"
                      />

                      <Title ta="center" order={3}>
                        GUARANTEE LETTER
                      </Title>
                    </Flex>

                    <Text size={rem(10)} ta="left">
                      <b>
                        Office address:- nirmad tower Block-C 912-913 Mira road
                        Mumbai 401107
                      </b>
                    </Text>

                    <Divider color="dark.9" />

                    <Text size="xs">Dear, Dream 11 User,</Text>

                    <Text size="xs">
                      <b>Subject:- 100% Winning guarantee</b> <br />
                      <br />
                      Dream 11 Office में आपका हार्दिक स्वागत है। मुझे पता है
                      सबकी तरह आपका भी सपना होगा 1st Rank जीतकर करोड़पति बनने का
                      तो आप सही जगह आ गए हैं।
                      <br />
                      <br />
                      <b>
                        Important:- जितने सारे लोग 1st Rank में 1 करोड़ जीतते है
                        वो सब इसी Website से Rank Book करते हैं या करवाते हैं।
                      </b>
                      <br />
                      <br />
                      आपको Dream 11 के अलावा और कोई दूसरा पूरे Market में 1
                      करोड़ नही जीता सकता इसलिए Fraud लोगो से दूर रहो।
                      <br />
                      Dream 11 Office एक Secret Website है यहां से आप 3 महीने
                      में केवल 1 बार ही Rank Book कर सकते हो।
                      <br />
                      <br />
                      <b>
                        Guarantee:- यदि आज के मैच में किसी भी कारण आप नही जीते (
                        जैसे बारिश हो गई और Match Cancel हो गया )तो Match खत्म
                        होते ही आपका पैसा आपके Bank Account में भेज दिया जायेगा।
                      </b>
                    </Text>

                    <Flex justify="space-between">
                      <Text size="xs">
                        {" "}
                        <b>
                          Thanks, Dream 11 Team <br />
                          office@dream11team.com{" "}
                        </b>
                      </Text>

                      <Image w={150} src="/stamp-img.png" alt="stamp" />
                    </Flex>
                  </Stack>

                  <form
                    onSubmit={GurrenteForm.onSubmit((values) => {setVideoVisible(true);setModalState(null);void router.push('./pay');})}
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
                        className="button-continue"
                        size="md"
                        radius="md"
                        color="green.8"
                        disabled={
                          String(GurrenteForm.values.mobile).length !== 10
                        }
                        type="submit"
                        loading={SubmitApi.isLoading}
                      >
                        Continue
                      </Button>
                    </Stack>
                  </form>
                </Flex>
              </Stack>
            </>
          )}
        </Container>
      )}
    </Modal>
  );
};
