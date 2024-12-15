
 import {db,  setDB} from '../src/db/db'
import {dataset1} from '../src/db/dataset'
import {SETTINGS} from '../src/settings'
 import {req} from "../src/input-output/test-helpers";


describe('/videos', () => {
     beforeAll(async () => {
         setDB()
     })

    it('should get empty array', async () => {

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
        console.log(db.videos)

    })
    it('should get not empty array', async () => {
         setDB(dataset1)

         await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
        console.log(db.videos)

    })
    it('should create videos with corect data', async () => {
        await req
            .post('/videos')
            .send({
                title: "some title",
                author: "some author",
                availableResolution: ["P144", "P240"] // Must match Resolutions enum
            })
            .expect(201)
            .then((res) => {
                console.log("Created Video:", res.body);
            });


    })

    it('should update video', async () => {
          const data = {title: 'update title', author: 'Author Name put'};

           setDB(dataset1)
           const videoId = db.videos[0].id
          await req
              .put(`/videos/${videoId}`)
              .send(data)
              .expect(204)
          await req
              .get(`/videos/${videoId}`)
              .expect(200, {
                  ...db.videos[0],
                  title: data.title,
              })
              console.log(db.videos[0])

    })
    it('find video by id', async () => {
        setDB(dataset1)
        console.log(db.videos)
        const videoId = db.videos[0].id

        const res = await req
            .get(`/videos/${videoId}`)
            .expect(200)

        console.log(res.body)
    })
    it('should delete video by id', async () => {
        setDB(dataset1)
        const videoId = db.videos[0].id
        console.log('Before deletion:', db.videos);
        await req
            .delete(`/videos/${videoId}`)
            .expect(204)
        console.log('After deletion:', db.videos);

        await req
            .get(`/videos/${videoId}`)
            .expect(404)
        await req
            .get('/videos')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({})
            })
    })
    it('should delete video', async () => {
        await req
            .delete('/testing/all-data')
            .expect(204);
        expect(db.videos).toEqual([]);
    })

})