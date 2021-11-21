import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'

export class ListUserReceiverComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

    const compliment = await complimentsRepositories.find({
      where: {
        user_receiver: user_id
      },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    return compliment
  }
}
