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
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center',
            flexDirection: 'column', alignItems: 'center', pt: 4, pb: 6
        }}>
            <Typography sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                textAlign: 'center', color: '#325343',
                letterSpacing: '0.1rem',
                fontWeight: 600
            }
            }>Frequently asked questions</Typography>

            <Box sx={{ maxWidth: '80%', width: '90rem', mt: 4 }}>
                {accordionDetails.map((item, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded}
                        onChange={handleExpansion}
                        slots={{ transition: Fade as AccordionSlots['transition'] }}
                        slotProps={{ transition: { timeout: 400 } }}
                        sx={{
                            '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                            '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                            p: 1,
                            '& .MuiAccordionSummary-content': {
                                fontSize: '1.2rem',
                            },

                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {item.content}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

        </Box>
    );
}
