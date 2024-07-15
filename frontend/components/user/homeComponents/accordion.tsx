'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { accordionDetails } from './accordionDetails';

export default function AccordionTransition() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleExpansion = (panel: string) => (
        event: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center',
            flexDirection: 'column', alignItems: 'center', pt: 4, pb: 10, backgroundColor: '#325343'
        }}>
            <Typography sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                textAlign: 'center', color: 'white',
                letterSpacing: '0.1rem',
                fontWeight: 600
            }}>Frequently asked questions</Typography>

            <Box sx={{ maxWidth: '80%', width: '90rem', mt: 4 }}>
                {accordionDetails.map((item, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleExpansion(`panel${index}`)}
                        slots={{ transition: Fade as AccordionSlots['transition'] }}
                        slotProps={{ transition: { timeout: 400 } }}
                        sx={{
                            '& .MuiAccordionDetails-root': { display: expanded === `panel${index}` ? 'block' : 'none' },
                            p: 1,
                            '& .MuiAccordionSummary-content': {
                                fontSize: '1.2rem',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography dangerouslySetInnerHTML={{ __html: item.content }} />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

        </Box>
    );
}
