'use server'

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { faker } from '@faker-js/faker';
import crypto from 'crypto';


export async function populateUsers() {
  const result = await AuthorizeAdmin();
  if (!result) {
    return;
  }

  const usersData = []
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    usersData.push({ name, email })
  }

  await prisma.user.createMany({
    skipDuplicates: true,
    data: usersData,
  })
}

export async function createCourse() {
  const result = await AuthorizeAdmin();
  if (!result) {
    return;
  }

  const courseName = getRandomCourseName();
  const organisationId = generateOrganizationCode();
  const session = await auth()
  const ownerId = session?.user?.id

  if (ownerId === undefined) {
    return;
  }

  const userCount = await prisma.user.count();
  const skip = Math.floor(Math.random() * userCount);
  const take = Math.floor(Math.random() * 11) + 5;
  const studentIds = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: take,
    skip: skip,
    orderBy: {
      id: 'desc'
    }
  })

  const course = await prisma.course.create({
    data: {
      name: courseName,
      organisationId: organisationId,
      owners: {
        connect: {id: ownerId}
      },
      students: {
        connect: studentIds
      }
    }
  })
}

async function AuthorizeAdmin(): Promise<boolean> {
  const session = await auth();
  
  if (!session || !session.user) {
    return false;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id
    }
  })

  if (user === null || !user.isAdmin) {
    return false;
  }

  return true;
}

function getRandomCourseName(): string {
  return sampleCourses[Math.floor(Math.random() * sampleCourses.length)];
}

function generateOrganizationCode(): string {
  return faker.string.alphanumeric(8).toUpperCase();
}

const sampleCourses = [
  'Introduction to Psychology',
  'Calculus I',
  'English Literature',
  'General Chemistry',
  'World History',
  'Principles of Economics',
  'Data Structures',
  'Introduction to Philosophy',
  'Microbiology',
  'Art History',
  'Sociology 101',
  'Organic Chemistry',
  'Physics with Calculus',
  'Introduction to Statistics',
  'Human Anatomy',
  'Introduction to Programming',
  'Biochemistry',
  'Advanced Calculus',
  'Shakespearean Studies',
  'Environmental Science',
  'Macroeconomics',
  'Computer Networks',
  'Ethics in Philosophy',
  'Genetics',
  'Modern Art History',
  'Cultural Anthropology',
  'Analytical Chemistry',
  'Classical Mechanics',
  'Probability and Statistics',
  'Physiology',
  'Algorithms',
  'Cell Biology',
  'Abstract Algebra',
  'American Literature',
  'Ecology',
  'Microeconomics',
  'Operating Systems',
  'Metaphysics',
  'Immunology',
  'Renaissance Art',
  'Social Psychology',
  'Physical Chemistry',
  'Quantum Physics',
  'Statistical Methods',
  'Neuroscience',
  'Database Systems',
  'Biotechnology',
  'History of Western Civilization',
  'Developmental Psychology',
  'Spectroscopy',
  'Electromagnetism',
  'Linear Algebra',
  'Plant Biology',
  'Software Engineering',
  'Political Science',
  'Human Genetics',
  'Early Modern Literature',
  'Organic Synthesis',
  'Classical Sociological Theory',
  'Inorganic Chemistry',
  'Thermodynamics',
  'Inferential Statistics',
  'Animal Physiology',
  'Theory of Computation',
  'Genomic Biology',
  'Topology',
  'Victorian Literature',
  'Marine Biology',
  'Behavioral Economics',
  'Distributed Systems',
  'Philosophy of Mind',
  'Pathophysiology',
  'Medieval Art',
  'Personality Psychology',
  'Surface Chemistry',
  'Relativity Theory',
  'Multivariate Analysis',
  'Cognitive Neuroscience',
  'Human-Computer Interaction',
  'Molecular Biology',
  'History of the American South',
  'Abnormal Psychology',
  'Organic Reaction Mechanisms',
  'Solid State Physics',
  'Regression Analysis',
  'Developmental Biology',
  'Artificial Intelligence',
  'International Relations',
  'Neurogenetics',
  'Shakespeare and His Contemporaries',
  'Environmental Microbiology',
  'Game Theory',
  'Cryptography',
  'Bioinformatics',
  'Digital Signal Processing',
  'Comparative Politics',
  'Philosophy of Science',
  'Advanced Organic Chemistry',
  'Aerospace Engineering'
];