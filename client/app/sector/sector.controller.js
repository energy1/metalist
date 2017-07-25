export default class SectorController {
    
    constructor(match, TicketsService, $stateParams, CartService, PriceSchemaService, StadiumDinamo, StadiumSolar, StadiumMetalist) {
        'ngInject';
        this.cartService = CartService;
        this.priceSchemaService = PriceSchemaService;
        this.ticketsService = TicketsService;
        this.match = match;
        
        this.reservedSeats = [];
        this.selectedSeats = [];
        this.tribuneName = $stateParams.tribune;
        this.sectorPrice = '';
        this.rowRow = 'Ряд';
        this.message = '';
        this.firstUpperRow = this.getFirstUpperRow($stateParams.sector);
        this.sector = this.getSectorByStadium($stateParams.sector, $stateParams.tribune, StadiumDinamo, StadiumSolar, StadiumMetalist);
    
        this.getPrice();
        this.getReservedSeats();
        this.getSelectedSeats();
        this.createSectorSeats();
    }
    
    addSeatToCart(slug) {
        this.message = '';
        
        this.cartService.addSeatToCart(slug, this.match.id)
            .then( () => this.updateReservedTickets() )
            .catch((err) => {
                if (err.status === 409) {
                    this.message = 'Это место уже занято.';
                }
                this.getReservedSeats();
            });
    }
    
    deleteSeatFromCart(slug) {
        this.message = '';
        
        this.cartService.removeSeatFromCart(slug, this.match.id)
            .then( () => this.updateReservedTickets() )
            .catch( err => this.getReservedSeats() );
    }
    
    updateReservedTickets() {
        this.getReservedSeats();
        this.getSelectedSeats();
    }
    
    getReservedSeats() {
        let matchId = this.match.id,
            sectorName = this.sector.name;
        
        return this.ticketsService.fetchReservedSeats(matchId, sectorName)
            .then( seats => {
                this.reservedSeats = seats;
                this.updateSectorSeats();
            });
    }
    
    getSelectedSeats() {
        this.selectedSeats = this.cartService.getMyCart().seats.map(seat => {
            return {
                slug: seat.slug,
                matchId: seat.match.id
            };
        });
    }
    
    getSectorByStadium(sector, tribune, StadiumDinamo, StadiumSolar, StadiumMetalist) {
        const stadiumName = this.match.priceSchema.priceSchema.stadiumName;
        
        if (stadiumName === 'dinamo') {
            return StadiumDinamo['tribune_' + tribune]['sector_' + sector];
        }
        if (stadiumName === 'solar') {
            return StadiumSolar['tribune_' + tribune]['sector_' + sector];
        }
        return StadiumMetalist['tribune_' + tribune]['sector_' + sector];
    }
    
    getPrice() {
        let priceSchema = this.match.priceSchema.priceSchema;
        this.sectorPrice = this.priceSchemaService.getPriceBySector(this.tribuneName, this.sector.name, priceSchema);
    }
    
    createSectorSeats() {
        this.sector.rows = this.makeRowSeats();
        
        return this.sector.rows.forEach( row => row.seats = this.makeSeatObject(row) );
    }
    
    updateSectorSeats() {
        this.sector.rows.forEach(row => {
            row.seats.forEach(seat => {
                seat.isSelected = this.isSelectedSeat(seat.slug);
                seat.isSold = this.isSoldSeat(seat.slug);
            });
        });
    }
    
    makeRowSeats() {
        return this.sector.rows.map(row => {
            return {
                name: row.name,
                seats: this.makeArrayFromNumber(row.seats)
            }
        });
    }
    
    makeSeatObject(row) {
        return row.seats.map(seat => {
            return {
                slug: 's' + this.sector.name + 'r' + row.name + 'st' + seat,
                seat: seat,
                isSelected: this.isSelectedSeat('s' + this.sector.name + 'r' + row.name + 'st' + seat),
                isSold: this.isSoldSeat('s' + this.sector.name + 'r' + row.name + 'st' + seat)
            }
        });
    }
    
    isSelectedSeat(slug) {
        return this.selectedSeats.some((seat) => seat.slug === slug && seat.matchId === this.match.id );
    }
    
    isSoldSeat(slug) {
        return this.reservedSeats.includes(slug);
    }
    
    getFirstUpperRow(sectorNumber) {
        let sectorDividers = {
            "1": 19,
            "2": 20,
            "8": 20,
            "9": 19,
            "10": 15,
            "11": 15,
            "12": 15,
            "13": 15,
            "14": 15,
            "15": 15,
            "16": 15,
            "17": 15,
            "18": 15,
            "19": 15,
            "20": 15,
            "22": 9,
            "23": 9,
            "24": 9,
            "25": 9,
            "26": 9,
            "27": 9,
            "28": 9,
            "29": 9,
        };
        return sectorDividers[sectorNumber] || 1;
    }
    
    makeArrayFromNumber (number) {
        const seats = [];
        for (let i = 1; i <= number; i++) {
            seats.push(i);
        }
        return seats;
    }
    
    isSkybox() {
        let skyBoxes = ['SB_1', 'SB_2', 'SB_3_5', 'SB_6', 'SB_7', 'SB_8', 'SB_9', 'SB_10', 'SB_11' ];
        return skyBoxes.includes(this.sector.name);
    }
    
    isFreeSeats() {
        let tribuneNames = ['east', 'north'];
        return tribuneNames.includes(this.tribuneName);
    }
}
