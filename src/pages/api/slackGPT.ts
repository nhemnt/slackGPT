import { slackGpt } from '@/server/controllers/slackGpt.controller'
import { NextApiHandler } from '@/server/middelwares/NextApiHandler'
import { withAuth } from '@/server/middelwares/withAuth'

// export const config = {
//   runtime: "edge",
// };


export default NextApiHandler({
  // on post method
  post: withAuth(slackGpt),
})
