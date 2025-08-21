import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function getCurrentUser() {
  const { userId } = await auth()
  if (!userId) return null
  return prisma.user.findUnique({ where: { clerkId: userId } })
}

export async function createUserIfNotExists(clerkId: string, email: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { clerkId } })
  if (existing) return existing
  return prisma.user.create({ data: { clerkId, email, name } })
}

export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) throw new Error('User not found')
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'ADMIN') throw new Error('Forbidden: Admin access required')
  return user
}


