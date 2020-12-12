import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

const H3 = styled.h3`
    margin-top: 30px;
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 5px 20px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ParticipantDiv = styled.div`
    display: flex;
    align-items: center;

    padding: 10px 14px;
    margin-bottom: 16px;
    margin-right: 10px;

    font-size: 14px;

    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};

    border-radius: 8px;
`;

const ParticipantDelete = styled.div`
    color: ${({ theme }) => theme.colors.primary};

    margin-bottom: 18px;

    cursor: pointer;
`;

const Participant = ({ showButton, name, email, onDelete }) => (
    <Wrapper>
        <ParticipantDiv>
            {name} ({email})
        </ParticipantDiv>
        {
            showButton &&
            <ParticipantDelete onClick={onDelete}>
                <MdDelete size="28" />
            </ParticipantDelete>
        }
    </Wrapper>
);

export default function Participants({ showButton, participants, setParticipants }) {
    const router = useRouter();
    const { id, adminKey } = router.query;

    async function deleteAPIParticipant(participantId) {
        const { NEXT_PUBLIC_API_URL } = process.env;
        return await fetch(`${NEXT_PUBLIC_API_URL}/secret/${id}/participants/${participantId}`, {
            method: 'DELETE',
            headers: new Headers({
                'admin-key': adminKey,
            })
        });
    }

    async function deleteParticipant(id) {
        const { status } = await deleteAPIParticipant(id);
        if (status === 204) {
            setParticipants(participants.filter(({ externalId }) => externalId !== id))
        }
    }

    return (
        <>
            <H3>Participantes:</H3>
            <Container>
                {
                    !participants.length && <p>Nenhum participante cadastrado ainda.</p>
                }
                {   
                    participants.map(({ name, email, externalId }) => (
                        <Participant 
                            key={`participant-${externalId}`}
                            name={name}
                            email={email}
                            showButton={showButton}
                            onDelete={() => deleteParticipant(externalId)}
                        />

                    ))
                }
            </Container>
        </>
    );
}