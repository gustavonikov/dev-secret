import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MdDone } from 'react-icons/md';

import Button from './Button';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Sort({ hasDrew }) {
    const router = useRouter();
    const { id, adminKey } = router.query;

    const [draft, setDraft] = useState(false);

    const DRAFT_STATUS = draft || hasDrew

    async function handleSort() {
        const { NEXT_PUBLIC_API_URL } = process.env;

        const { status } = await fetch(`${NEXT_PUBLIC_API_URL}/secret/${id}/draw`, {
            method: 'PUT',
            headers: new Headers({
                'admin-key': adminKey
            }),
        });

        if (status === 200) setDraft(true);
    }

    return (
        <Container>
            {
                DRAFT_STATUS && (
                    <>
                        <MdDone size={22} color='#008000'/>
                        <p>O sorteio já foi realizado.</p>
                    </>
                )
            }
            {
                !DRAFT_STATUS && <Button onClick={handleSort}>Sortear</Button>
            }
        </Container>
    );
}
