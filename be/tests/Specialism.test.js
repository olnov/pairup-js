jest.mock('../models/Specialism', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
}));

const specialismController = require('../controllers/Specialism');
const Specialism = require('../models/Specialism');
const httpMocks = require('node-mocks-http');

describe('Specialism Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Create Specialism", () => {
        it("should have a createSpecialism function and return 201", async () => {
            const req = httpMocks.createRequest({
                body: {
                    title: 'Frontend',
                    stack: 'HTML, CSS, JS',
                },
            });
            const res = httpMocks.createResponse();
            const newSpecialism = { id: 1, ...req.body };

            Specialism.findOne.mockResolvedValue(null);
            Specialism.create.mockResolvedValue(newSpecialism);

            await specialismController.createNewSpecialism(req, res);

            expect(Specialism.findOne).toHaveBeenCalledWith({ where: { title: 'Frontend' } });
            expect(Specialism.create).toHaveBeenCalledWith({
                title: 'Frontend',
                stack: 'HTML, CSS, JS'
            });
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({ message: 'New specialism created successfully.', specialismId: 1 });
        });
    });
});