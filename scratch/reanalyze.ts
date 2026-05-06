import { analyzeComplaintData } from './src/lib/nexus';
import { prisma } from './src/lib/prisma';
import * as dotenv from 'dotenv';
dotenv.config();

async function reanalyze() {
    const protocol = 'F0C4-9E9F-2DB6';
    console.log(`Re-analyzing protocol: ${protocol}...`);
    
    try {
        const complaint = await prisma.complaint.findUnique({
            where: { protocol },
            include: { aiAnalysis: true }
        });

        if (!complaint) {
            console.error('Complaint not found.');
            return;
        }

        console.log('Description:', complaint.description);

        const analysis = await analyzeComplaintData({
            description: complaint.description,
            type: complaint.type,
            sector: complaint.sector || undefined,
            accusedPosition: complaint.accusedPosition || undefined,
        });

        console.log('New Analysis:', JSON.stringify(analysis, null, 2));

        // Update or create analysis record
        await prisma.complaintAnalysis.upsert({
            where: { complaintId: complaint.id },
            update: {
                sentiment: analysis.sentiment,
                urgency: analysis.urgency,
                summary: analysis.summary,
                keyEntities: JSON.stringify(analysis.keyEntities),
                riskLevel: analysis.riskLevel,
                recommendedActions: JSON.stringify(analysis.recommendedActions),
                legalFramework: JSON.stringify(analysis.legalFramework),
            },
            create: {
                complaintId: complaint.id,
                sentiment: analysis.sentiment,
                urgency: analysis.urgency,
                summary: analysis.summary,
                keyEntities: JSON.stringify(analysis.keyEntities),
                riskLevel: analysis.riskLevel,
                recommendedActions: JSON.stringify(analysis.recommendedActions),
                legalFramework: JSON.stringify(analysis.legalFramework),
            }
        });

        console.log('Database updated successfully!');
    } catch (error) {
        console.error('Re-analysis failed:', error);
    }
}

reanalyze();
